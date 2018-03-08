using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SW.Startup))]
namespace SW
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
