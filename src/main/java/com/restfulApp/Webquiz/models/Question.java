package com.restfulApp.Webquiz.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NotBlank
    private String title;

    @Column
    @NotBlank
    private String text;

    @Column
    @NotNull
    @ElementCollection
    @Size(min = 2)
    private List<String> options;

    @Column
    @ElementCollection
    @JsonIgnore
    private List<Integer> answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    protected Question() {}

    @JsonCreator
    public Question(@JsonProperty("title") String title,
                    @JsonProperty("text") String text,
                    @JsonProperty("options") List<String> options,
                    @JsonProperty("answer") List<Integer> answer) {
        this.title = title;
        this.text = text;
        this.options = options;
        this.answer = answer == null ? new ArrayList<>() : answer;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    public List<String> getOptions() {
        return options;
    }

    public boolean isCorrect(List<Integer> option) {
        Collections.sort(option);
        return option.equals(answer);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
