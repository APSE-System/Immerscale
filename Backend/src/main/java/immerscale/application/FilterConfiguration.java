package immerscale.application;

import immerscale.application.filters.CorsFilter;
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

    @Autowired
    private CorsFilter corsFilter;

    @Bean
    public FilterRegistrationBean<WorkerViewFilter> registerWorkerViewFilter() {

        FilterRegistrationBean<WorkerViewFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(workerViewFilter);
        registrationBean.addUrlPatterns("/workerView/*");
        registrationBean.setOrder(2);

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<PhotoViewFilter> registerPhotoViewFilter() {

        FilterRegistrationBean<PhotoViewFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(photoViewFilter);
        registrationBean.addUrlPatterns("/photoView/*");
        registrationBean.setOrder(1);

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> registerCorsFilter() {

        FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(corsFilter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(0);

        return registrationBean;
    }



}
