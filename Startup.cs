using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using SecondCoreApp.Models;

namespace SecondCoreApp
{
    public class Startup
    {
        private IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;


        public string DBConnectionString
        {
            get
            {
                string conn = string.Empty;
                if (_hostingEnvironment.IsDevelopment())
                {
                    conn = _config.GetConnectionString("EmployeeDBConnection_Dev");
                    if (!string.IsNullOrEmpty(conn) && conn.Contains("|DataDirectory|"))
                        conn = conn.Replace("|DataDirectory|", _hostingEnvironment.ContentRootPath + "\\App_Data");
                }
                else if (_hostingEnvironment.IsProduction())
                {
                    conn = _config.GetConnectionString("EmployeeDBConnection_Prod");
                }

                return conn;
            }
        }
        public Startup(IConfiguration config, IHostingEnvironment hostingEnvironment)
        {
            _config = config;
            _hostingEnvironment = hostingEnvironment;

        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(DBConnectionString));
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            }

            );

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            }).AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()).SetCompatibilityVersion(CompatibilityVersion.Version_2_1); ;

            services.AddAuthorization(option =>
            {
                option.AddPolicy("DeleteRole", policy => policy.RequireClaim("Delete Role"));
                option.AddPolicy("CreateRole", policy => policy.RequireClaim("Create Role"));
                option.AddPolicy("EditRole", policy => policy.RequireClaim("Edit Role"));
            });

            services.AddScoped<IEmployeeRepository, SQLEmployeeRepository>();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddHttpContextAccessor();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

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
                app.UseExceptionHandler("/Error");
                app.UseStatusCodePagesWithReExecute("/Error/{0}");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseCors("CorsPolicy");
            app.UseMvc(routes =>
            {
                if (!string.IsNullOrEmpty(_config["AppToRun"]) && _config["AppToRun"].ToUpper() == "ANGULAR")
                    routes.MapRoute("default", "{controller=Home1}/{action=Index1}/{id?}");
                else
                    routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new TimeSpan(0, 1, 30);
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            //app.UseMvcWithDefaultRoute();
            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync(_config["MyKey"]);
            //NPM commands:
            //30-Aug-2019: npm install @angular/animations --save , npm install ngx-toastr --save
            //});
        }
    }
}
