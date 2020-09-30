using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
//using AutoMapper.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Revolut.Interfaces.Repositories;
using Revolut.Mapping;
using Revolut.Repositories;
using Revolut.Services;

namespace Revolut
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddAutoMapper();

            services.AddSingleton(Configuration);

            services.AddScoped<IUserService, UsersService>();
            services.AddScoped<IGroupsService, GroupsService>();
            services.AddScoped<IFriendsService, FriendsService>();

            services.AddScoped<IUserMapping, UserMapping>();
            services.AddScoped<IGroupMapping, GroupMapping>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupsRepository, GroupsRepository>();
            services.AddScoped<IFriendsRepository, FriendsRepository>();
            services.AddScoped<IBillsRepository, BillsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.UseStatusCodePages();
            /*app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });*/
        }
    }
}
