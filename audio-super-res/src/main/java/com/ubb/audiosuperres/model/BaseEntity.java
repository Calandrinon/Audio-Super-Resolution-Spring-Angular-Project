package com.ubb.audiosuperres.model;

import lombok.ToString;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
@ToString(callSuper = true)
public class BaseEntity implements Serializable {
    @Id
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}