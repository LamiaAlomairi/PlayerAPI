package com.PlayerAPI.PlayerAPI.Model;

import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;

import javax.persistence.*;

//@Setter
//@Getter
@Entity
@Data
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    public String name;
    public String email;
}
