using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Repositories;
using BenefitsManagementWebApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;

namespace BenefitsManagementWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            var config = new HttpConfiguration();
            config.EnableCors();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAreaService, AreaService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAreaRepository, AreaRepository>();
            services.AddScoped<IBenefitService, BenefitService>();
            services.AddScoped<IBenefitRepository, BenefitRepository>();

            services.AddIdentity<IUserRepository, UserRepository>(
            opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequiredLength = 8;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors("AllowAll");
                

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
