
using System;
using Unity;

namespace BizOS.Base.BL
{
    public static class UnityContainerInstance
    {
        private static IUnityContainer container;
        public static IUnityContainer Container
        {
            get
            {
                return container;
            }
            set
            {
                if(container==null)
                    container = value;
            }
        }
    }
}
