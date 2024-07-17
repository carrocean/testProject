package com.yonyou.ucf.mdf;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class SpringConfig {

    @Bean
    public ResourceBundleMessageSource messageSource() throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        ResourceBundleMessageSource messageSource = (ResourceBundleMessageSource) Class.forName("com.yonyou.iuap.ucf.multilang.runtime.UcfStaticMessageSource").newInstance();
        return messageSource;
    }
}
