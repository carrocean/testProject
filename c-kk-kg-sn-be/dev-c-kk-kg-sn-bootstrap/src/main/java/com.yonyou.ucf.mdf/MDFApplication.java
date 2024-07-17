package com.yonyou.ucf.mdf;

import com.yonyou.cloud.inotify.client.NotifyStub;
import com.yonyou.cloud.yonscript.filter.J2v8DebugHelperFilter;
import com.yonyou.diwork.config.DiworkEnv;
import com.yonyou.diwork.filter.DiworkRequestListener;
import com.yonyou.iuap.ucf.log.filter.MDCLogFilter;
import com.yonyou.iuap.ucf.multilang.runtime.utils.MlRemoteTool;
import com.yonyou.ypd.bill.basic.spring.SpringPropertyUtil;
import lombok.SneakyThrows;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.ImportResource;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.IOException;


/**
 * spring-boot 入口类
 */
@EnableAsync
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, RabbitAutoConfiguration.class})
@ComponentScan(basePackages = {"com.yonyou", "com.yonyoucloud"},
        excludeFilters = {@ComponentScan.Filter(type = FilterType.REGEX,
                pattern = {"com.yonyou.ucf.mdd.core.file.oss.FileSrv","com.yonyou.ucf.mdd.ext.bill.controller.BillPrintController","com.yonyou.ucf.mdd.ext.aop.AuthServiceContextAop"})})
@ImportResource(locations = {DiworkEnv.DIWORK_CONFIG_XML,"classpath*:/config/applicationContext*.xml","classpath*:/spring-sub/applicationContext*.xml"})
public class MDFApplication extends SpringBootServletInitializer {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(MDFApplication.class, args);
        MlRemoteTool.init(SpringPropertyUtil.getProperty("spring.profile"));//初始化多语配置
        // 缓存通知配置
        //NotifyStub.start();
    }

    @SneakyThrows
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 注意这里要指向原先用main方法执行的Application启动类
        SpringApplicationBuilder applicationBuilder = builder.sources(MDFApplication.class);
        MlRemoteTool.init(SpringPropertyUtil.getProperty("spring.profile"));//初始化多语配置
        // 缓存通知配置
        //NotifyStub.start();
        return applicationBuilder;
    }

    /**
     * 配置请求上下文拦截器
     */
    @Bean
    public FilterRegistrationBean RequestListener() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new DiworkRequestListener());
        registrationBean.addUrlPatterns("/*");
        registrationBean.addInitParameter("excludedPages",
                "/api/yonscript/,/billstaterule,/graphql,/pub/fileupload/download,/bpm/complete,/bpm/registerInterface,/bpm/,/upd/,/test,/formula/,/tenant/,/mobile/app/,/extend/healthycheck,/extend/upgradeBillCode");
        return registrationBean;
    }

    /**
     * ucf-log 日志接入
     * @return
     */
    @Bean
    public FilterRegistrationBean LogFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new MDCLogFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    /**
     * J2v8 debugHelper
     * @return
     */
    @Bean
    public FilterRegistrationBean debugHelperFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new J2v8DebugHelperFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

}
