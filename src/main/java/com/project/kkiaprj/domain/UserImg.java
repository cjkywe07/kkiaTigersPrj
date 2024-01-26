package com.project.kkiaprj.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "user_img")
public class UserImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId")
    @ToString.Exclude
    private Long userId;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String sourceName;
}
