﻿using ComputerUtils.Logging;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OculusDB.Users
{
    public class DiscordWebhookSender
    {
        public static void SendActivity(DateTime start)
        {
            Logger.Log("Sending activity via Discord webhooks after " + start);
            List<DiscordActivityWebhook> activityWebhooks = MongoDBInteractor.GetWebhooks();
            if(activityWebhooks.Count <= 0) return;
            List<BsonDocument> activities = MongoDBInteractor.GetLatestActivities(DateTime.MinValue);
            foreach(DiscordActivityWebhook activityWebhook in activityWebhooks)
            {
                foreach(BsonDocument activity in activities)
                {
                    activityWebhook.SendWebhook(activity);
                }
            }
        }
    }
}
