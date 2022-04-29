package com.ubb.audiosuperres.model;

import lombok.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BaseEntityDto implements Serializable {
    private Integer id;
}
