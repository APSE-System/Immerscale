package immerscale.application;

import immerscale.application.filters.PhotoViewFilter;
import immerscale.application.filters.WorkerViewFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


// Configuration for mapping the requests to certain Filter:
//
// => /workerView/* Requests should be filtered by the WorkerView Filter
// => /photoView/* Requests should be filtered by the PhotoView Filter

@Configuration
public class FilterConfiguration {

    @Autowired
    private WorkerViewFilter workerViewFilter;

    @Autowired
    private PhotoViewFilter photoViewFilter;

    @Bean
    public FilterRegistrationBean<WorkerViewFilter> filterRegistrationBean() {

        FilterRegistrationBean<WorkerViewFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(workerViewFilter);
        registrationBean.addUrlPatterns("/workerView/*");

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<PhotoViewFilter> filterFilterRegistrationBean() {

        FilterRegistrationBean<PhotoViewFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(photoViewFilter);
        registrationBean.addUrlPatterns("/photoView/*");

        return registrationBean;
    }
}
