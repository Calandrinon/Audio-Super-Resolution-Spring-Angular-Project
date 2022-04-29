package com.ubb.audiosuperres.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@ToString(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="Users")
public class User extends BaseEntity implements Serializable {
    private String username;
    private String email;
    private String password;
}
