package com.restfulApp.Webquiz.services;

import com.restfulApp.Webquiz.models.Question;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface QuestionService {

    Question saveQuestion(Question question);

    Question getQuestionById(Long id);

    Page<Question> getAllQuestions(Optional<Integer> page);

    void deleteQuestion(Long id);

    boolean questionMatchUser(Long id);
}
