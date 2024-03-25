package immerscale.application;

import immerscale.application.filters.PhotoViewFilter;
import immerscale.application.filters.WorkerViewFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.swing.plaf.PanelUI;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<WorkerViewFilter> filterRegistrationBean() {

        FilterRegistrationBean<WorkerViewFilter> registrationBean = new FilterRegistrationBean<>();
        WorkerViewFilter workerViewFilter = new WorkerViewFilter();

        registrationBean.setFilter(workerViewFilter);
        registrationBean.addUrlPatterns("/workerView/*");

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<PhotoViewFilter> filterFilterRegistrationBean() {

        FilterRegistrationBean<PhotoViewFilter> registrationBean = new FilterRegistrationBean<>();
        PhotoViewFilter photoViewFilter = new PhotoViewFilter();

        registrationBean.setFilter(photoViewFilter);
        registrationBean.addUrlPatterns("/photoView/*");

        return registrationBean;
    }
}
