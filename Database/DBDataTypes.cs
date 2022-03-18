﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OculusDB.Database
{
    public class DBDataTypes
    {
        public const string Application = "Application";
        public const string Version = "Version";
        public const string IAPItem = "IAPItem";
        public const string IAPItemPack = "IAPItemPack";
        public const string MonitoringApplication = "MonitoringApplication";


        //Activities
        public const string ActivityNewApplication = "ActivityNewApplication";
        public const string ActivityPriceChange = "ActivityPriceChange";
        public const string ActivityNewVersion = "ActivityNewVersion";
        public const string ActivityVersionUpdated = "ActivityVersionUpdated";

        public const string ActivityNewDLC = "ActivityNewDLC";
        public const string ActivityDLCUpdated = "ActivityDLCUpdated";
        public const string ActivityNewDLCPack = "ActivityNewDLCPack";
        public const string ActivityDLCPackUpdated = "ActivityDLCPackUpdated";
    }
}
