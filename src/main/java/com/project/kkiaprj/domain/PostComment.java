package com.project.kkiaprj.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "postcomment")
public class PostComment extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // PK

    @Column(nullable = false)
    private String content;  // 댓글 내용

    // Comment:User = N:1
    @ManyToOne(optional = false)
    @ToString.Exclude
    private User user;   // 댓글 작성자 (FK)

    @JsonIgnore
    @Column(name = "post_id")
    private Long post;   // 어느글의 댓글 (FK)

}
