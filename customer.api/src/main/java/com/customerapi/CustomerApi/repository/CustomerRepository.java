package com.customerapi.CustomerApi.repository;
import com.customerapi.CustomerApi.models.CustomerModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository  extends JpaRepository<CustomerModel, String>{
}
