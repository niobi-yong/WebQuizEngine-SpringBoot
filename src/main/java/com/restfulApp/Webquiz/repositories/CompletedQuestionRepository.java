package com.restfulApp.Webquiz.repositories;

import com.restfulApp.Webquiz.models.CompletedQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompletedQuestionRepository extends JpaRepository<CompletedQuestion, Long> {

    CompletedQuestion save(CompletedQuestion completedQuestion);

    Page<CompletedQuestion> findByUserId(Long userId, Pageable pageable);
}
