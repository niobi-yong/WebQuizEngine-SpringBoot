package com.restfulApp.Webquiz.repositories;

import com.restfulApp.Webquiz.models.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Question save(Question question);

    Optional<Question> findById(Long id);

    Page<Question> findAll(Pageable pageable);
}
