package com.yonyou.ucf.mdf;

import com.yonyou.iuap.ucf.multilang.runtime.UcfStaticMessageSource;
import com.yonyou.iuap.yms.redis.parent.YMSRedisFactory;
import com.yonyou.ucf.mdd.ext.core.AppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.SmartLifecycle;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.util.Pool;

/**
 * Bean注册完成后操作
 *
 *
 */
@Component
public class MdfSmartLifecycle implements SmartLifecycle {

    private boolean isRunning = false;
    @Value("yms.redis.code")
    private static String redisClientYMS;
    private static Logger log = LoggerFactory.getLogger(MdfSmartLifecycle.class);

    /**
     * bean初始化完毕后，该方法会被执行
     */
    @Override
    public void start() {
        log.error("bean初始化完成，走初始化完成后的指定业务逻辑...");

        // 处理多语缓存加载，配置多语redis缓存
        mlCacheConfigRedis();

        // 执行完其他业务后 isRunning = true;
        isRunning = true;
    }

    /**
     * 多个实现接口SmartLifecycle的类时，start的执行顺序按getPhase方法返回值从小到大执行，stop方法的执行顺序则相反
     */
    @Override
    public int getPhase() {
        return 99;
    }

    /**
     * 是否自动执行
     */
    @Override
    public boolean isAutoStartup() {
        return true;
    }

    /**
     * 当前状态，当false时才能执行start，当true时，才会执行stop
     */
    @Override
    public boolean isRunning() {
        return isRunning;
    }

    /**
     * spring容器发现当前对象实现了SmartLifecycle，就调用stop(Runnable)，
     */
    @Override
    public void stop(Runnable callback) {
        // 这个callback是要加入的啊
        callback.run();
        isRunning = false;
    }

    /**
     * 接口Lifecycle的子类的方法，如果只是实现了Lifecycle，就调用stop(),这个方法在这里相当于没有用
     */
    @Override
    public void stop() {
        isRunning = false;
    }

    /**
     * 多语redis缓存服务
     */
    private static void mlCacheConfigRedis() {
        log.error(">>>#mlCacheConfigRedis#进入多语言运行时服务启动");
        try {
            redisClientYMS = AppContext.getEnvConfig("yms.redis.code");
            UcfStaticMessageSource messageSource = new UcfStaticMessageSource();
            String profile = AppContext.getEnvConfig("spring.profiles.active");
            String domainUrl = AppContext.getEnvConfig("runtime.server.url");// 用于多语资源变化时通过事件中心调用
            int index = Integer.parseInt(AppContext.getEnvConfig("redis.mainIndex"));
            Pool<Jedis> multiLangRedisPool;

            YMSRedisFactory factory = AppContext.getBean(YMSRedisFactory.class);
            multiLangRedisPool = factory.createJedisPool(redisClientYMS);

            messageSource.configRedis(profile, multiLangRedisPool, domainUrl, index);
        } catch (Throwable e) {
            log.error(">>>#mlCacheConfigRedis#多语redis启用异常:{}", e.getMessage(), e);
        }
    }



}