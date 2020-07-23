package com.restfulApp.Webquiz.services;

import com.restfulApp.Webquiz.models.Question;
import com.restfulApp.Webquiz.repositories.CompletedQuestionRepository;
import com.restfulApp.Webquiz.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CompletedQuestionRepository completedQuestionRepository;

    @Override
    public Question saveQuestion(Question question) {
        String currentPrincipalName = retrieveUser();
        question.setUser(userService.findUser(currentPrincipalName));
        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).isPresent() ? questionRepository.findById(id).get() : null;
    }

    @Override
    public Page<Question> getAllQuestions(Optional<Integer> page) {
        return questionRepository.findAll(PageRequest.of(page.orElse(0), 10));
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.delete(getQuestionById(id));
    }

    @Override
    public boolean questionMatchUser(Long id) {
        return getQuestionById(id).getUser().getEmail().equals(retrieveUser());
    }

    private static String retrieveUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return authentication.getName();
        }

        return null;
    }
}
