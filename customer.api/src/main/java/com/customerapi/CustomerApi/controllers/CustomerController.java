package com.customerapi.CustomerApi.controllers;

import java.util.List;

import com.customerapi.CustomerApi.models.CustomerModel;
import com.customerapi.CustomerApi.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer/")
public class CustomerController {
    
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("getAll")
    public List<CustomerModel> getAll(){
        return this.customerRepository.findAll();
    }

    @PostMapping("create")
    public CustomerModel add(@RequestBody CustomerModel model){
        return this.customerRepository.save(model);
    }

    @PutMapping("update")
    public CustomerModel update(@RequestBody CustomerModel model){
        CustomerModel modelFromDb = customerRepository.findById(model.getId()).get();
        modelFromDb.setName(model.getName());         
        modelFromDb.setEmail(model.getEmail());         
        modelFromDb.setPhone(model.getPhone());         
        modelFromDb.setIncome(model.getIncome());         
        modelFromDb.setOutcome(model.getOutcome());         
        return this.customerRepository.save(modelFromDb);
    }

    @DeleteMapping("delete")
    public void delete(@RequestParam String id){
        this.customerRepository.deleteById(id);
    }    
}
