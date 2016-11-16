using System.Web;
using System.Web.Optimization;

namespace assets
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/styles/css").Include(
                        "~/styles/css/main.css"));

            bundles.Add(new ScriptBundle("~/js/home")
                .Include("~/js/components.min.js")
                .Include("~/js/bundle.js")
                .Include("~/js/main.min.js")
                );

            bundles.Add(new ScriptBundle("~/js/projetos")
            .Include("~/js/components.min.js")
            .Include("~/js/bundleProjetos.js")
            .Include("~/js/main.min.js")
            );

      
        }
    }
}
