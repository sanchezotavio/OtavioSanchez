using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(assets.Startup))]
namespace assets
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
