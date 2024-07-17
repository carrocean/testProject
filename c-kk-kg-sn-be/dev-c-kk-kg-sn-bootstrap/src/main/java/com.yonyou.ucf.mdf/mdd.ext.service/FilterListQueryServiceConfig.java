package com.yonyou.ucf.mdf.mdd.ext.service;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.stereotype.Component;

/**
 * @author liangrch@yonyou.com
 * @version 1.0
 * @createTime 2022/9/19 19:33
 * @description
 */
@Component
public class FilterListQueryServiceConfig implements BeanDefinitionRegistryPostProcessor {
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        registry.removeBeanDefinition("filterListQueryService");
        GenericBeanDefinition definition = new GenericBeanDefinition();
        definition.setBeanClass(YpdFilterListQueryService.class);
        registry.registerBeanDefinition("filterListQueryService", definition);
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {

    }
}
