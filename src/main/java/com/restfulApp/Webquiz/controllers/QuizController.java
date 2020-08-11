package com.restfulApp.Webquiz.controllers;

import com.restfulApp.Webquiz.*;
import com.restfulApp.Webquiz.models.CompletedQuestion;
import com.restfulApp.Webquiz.models.Question;
import com.restfulApp.Webquiz.models.User;
import com.restfulApp.Webquiz.repositories.CompletedQuestionRepository;
import com.restfulApp.Webquiz.services.QuestionService;
import com.restfulApp.Webquiz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @Autowired
    private CompletedQuestionRepository completedQuestionRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping(path = "/api/quizzes")
    public ResponseEntity<Page<Question>> getQuestions(@RequestParam Optional<Integer> page) {
        Page<Question> questions = questionService.getAllQuestions(page);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping(path = "/api/quizzes/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        checkArrayBounds(id);

        Question question = questionService.getQuestionById(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping(path = "/api/quizzes/completed")
    public ResponseEntity<Page<CompletedQuestion>> getCompletedQuestionForUser(Principal principal, @RequestParam Optional<Integer> page) {
        Page<CompletedQuestion> completedQuestions = completedQuestionRepository.findByUserId(userService.findUser(principal.getName()).getId(), PageRequest.of(page.orElse(0), 10, Sort.by(Sort.Direction.DESC, "completedAt")));
        return new ResponseEntity<>(completedQuestions, HttpStatus.OK);
    }

    @PostMapping(path = "/api/quizzes/{id}/solve")
    public ResponseEntity<Feedback> checkAnswer(@RequestBody Answer answer, @PathVariable Long id, Principal principal) {
        checkArrayBounds(id);

        if (questionService.getQuestionById(id).isCorrect(answer.getAnswerOptions())) {
            saveCompletedAt(id, principal);
            return new ResponseEntity<>(Feedback.CORRECT_ANSWER, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Feedback.WRONG_ANSWER, HttpStatus.NOT_FOUND);
        }

    }

    private void saveCompletedAt(@PathVariable Long id, Principal principal) {
        CompletedQuestion savedCompletedQuestion = new CompletedQuestion();
        savedCompletedQuestion.setQuestionId(id);
        savedCompletedQuestion.setCompletedAt(LocalDateTime.now());
        savedCompletedQuestion.setUser(userService.findUser(principal.getName()));

        completedQuestionRepository.save(savedCompletedQuestion);
    }

    private void checkArrayBounds(@PathVariable Long id) {
        if (questionService.getQuestionById(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "/api/quizzes")
    public ResponseEntity<Question> saveQuestion(@Valid @RequestBody final Question question) {
        Question savedQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<>(savedQuestion, HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        return new ResponseEntity("Your inputs are invalid. Please use the correct format.", HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/api/register")
    public ResponseEntity<User> addUser(@Valid @RequestBody final User user) {
        checkEmailAvailability(user);

        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    private void checkEmailAvailability(@RequestBody User user) {
        if (!userService.isEmailAvailable(user)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/api/quizzes/{id}")
    public ResponseEntity<Question> deleteQuestion(@PathVariable Long id) {
        questionMatcher(id);
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    private void questionMatcher(@PathVariable Long id) {
        checkArrayBounds(id);

        if (!questionService.questionMatchUser(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
