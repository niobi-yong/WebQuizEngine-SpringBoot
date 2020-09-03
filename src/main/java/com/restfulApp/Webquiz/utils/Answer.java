package com.restfulApp.Webquiz.utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class Answer {

    @NotBlank
    private final List<Integer> answerOptions;

    @JsonCreator
    public Answer(@JsonProperty("answer") List<Integer> answerOptions) {
        this.answerOptions = answerOptions;
    }

    public List<Integer> getAnswerOptions() {
        return answerOptions == null ? new ArrayList<>() : answerOptions;
    }
}
