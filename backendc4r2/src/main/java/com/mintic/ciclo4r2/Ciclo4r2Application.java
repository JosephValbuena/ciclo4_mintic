package com.mintic.ciclo4r2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Ciclo4r2Application {

	public static void main(String[] args) {
		SpringApplication.run(Ciclo4r2Application.class, args);
	}
        
//        @Bean
//        public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("*/**").allowedMethods("*").allowedOrigins("http://127.0.0.1:5500");
//			}
//		};
//	}

}
