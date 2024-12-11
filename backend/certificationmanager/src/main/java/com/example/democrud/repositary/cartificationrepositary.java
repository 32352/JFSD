package com.example.democrud.repositary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.democrud.model.user;


@Repository
public interface cartificationrepositary extends JpaRepository<user, Integer>{

}
