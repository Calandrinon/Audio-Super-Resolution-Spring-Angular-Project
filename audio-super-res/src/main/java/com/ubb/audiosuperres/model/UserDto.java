package com.ubb.audiosuperres.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class UserDto extends BaseEntityDto {
    private String username;
    private String password;
    private String email;
}
