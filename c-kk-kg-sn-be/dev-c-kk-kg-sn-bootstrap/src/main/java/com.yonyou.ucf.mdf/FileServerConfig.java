package com.yonyou.ucf.mdf;

import com.yonyou.ucf.mdd.ext.util.file.oss.Object;
import com.yonyou.ucf.mdd.ext.util.file.oss.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
public class FileServerConfig {

    /**
     * 初始化oss
     *
     * @return
     */
    @ConditionalOnProperty(prefix = "fileserver", name = "name", havingValue = "alioss", matchIfMissing = false)
    @ConditionalOnMissingBean({Object.IObject.class})
    @Bean("alioss")
    @DependsOn("mainAppContext")
    public Object.IObject alioss() {
        return new AliOss();
    }

    @ConditionalOnProperty(prefix = "fileserver", name = "name", havingValue = "fastdfs", matchIfMissing = false)
    @ConditionalOnMissingBean({Object.IObject.class})
    @Bean("fastdfs")
    @DependsOn("mainAppContext")
    public Object.IObject fastdfs() {
        return new FastDFS();
    }

    @ConditionalOnProperty(prefix = "fileserver", name = "name", havingValue = "huaweiobs", matchIfMissing = false)
    @ConditionalOnMissingBean({Object.IObject.class})
    @Bean("huaweiobs")
    @DependsOn("mainAppContext")
    public Object.IObject huaweiobs() {
        return new HuaweiObs();
    }

    @ConditionalOnProperty(prefix = "fileserver", name = "name", havingValue = "huaweiobs3", matchIfMissing = false)
    @ConditionalOnMissingBean({Object.IObject.class})
    @Bean("huaweiobs3")
    @DependsOn("mainAppContext")
    public Object.IObject huaweiobs3() {
        return new HuaweiObs3();
    }

    @ConditionalOnProperty(prefix = "fileserver", name = "name", havingValue = "minio", matchIfMissing = false)
    @ConditionalOnMissingBean({Object.IObject.class})
    @Bean("minio")
    public Object.IObject minio() {
        return new MinioServer();
    }
}
