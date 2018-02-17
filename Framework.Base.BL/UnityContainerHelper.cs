using Unity;

namespace Framework.Base
{
    public static class UnityContainerInstance
    {
        private static IUnityContainer container;
        public static IUnityContainer Container
        {
            get
            {
                return container = container ?? new UnityContainer();
            }
            set
            {
                if(container==null)
                    container = value;
            }
        }

    }
}
