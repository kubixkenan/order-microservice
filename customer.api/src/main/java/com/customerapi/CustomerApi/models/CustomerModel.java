package com.customerapi.CustomerApi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="customer", schema = "public")
public class CustomerModel implements Serializable{

    @Id
    @Column(name = "id", unique = true, nullable = false)    
    private String id;    
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "address")
    private String address;
    @Column(name = "income")
    private Double income;
    @Column(name = "outcome")
    private Double outcome;

    public CustomerModel(){
        super();
    }

    public CustomerModel(String name, String email, String phone, String address, Double income, Double outcome){
        super();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.income = income;
        this.outcome = outcome;        
    }


    public String getId(){
        return this.id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEmail(){
        return this.email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPhone(){
        return this.phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getAddress(){
        return this.address;
    }

    public void setAddress(String address){
        this.address = address;
    }
    
    public Double getIncome(){
        return this.income;
    }

    public void setIncome(Double income){
        this.income = income;
    }

    public Double getOutcome(){
        return this.income;
    }

    public void setOutcome(Double outcome){
        this.outcome = outcome;
    }
}
