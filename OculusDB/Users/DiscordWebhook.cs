﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ComputerUtils.Discord;
using OculusDB.Database;
using MongoDB.Bson.Serialization.Attributes;
using OculusGraphQLApiLib;
using System.Net;
using ComputerUtils.Logging;
using System.Text.Json;
using OculusDB.ObjectConverters;

namespace OculusDB.Users
{
    [BsonIgnoreExtraElements]
    public class DifferenceWebhook
    {
        [BsonIgnore]
        public Config config { get
            {
                return OculusDBEnvironment.config;
            } }
        public string url { get; set; } = "";
        public List<string> applicationIds { get; set; } = new List<string>();
        public DifferenceWebhookType type { get; set; } = DifferenceWebhookType.Discord;
        public List<DifferenceNameType> differenceTypes { get; set; } = new List<DifferenceNameType>();

        public void SendOculusDbWebhook(DBDifference difference)
        {
            if (!SendWebhook(difference)) return;
            WebClient c = new WebClient();
            c.Headers.Add("user-agent", OculusDBEnvironment.userAgent);
            c.UploadString(url, "POST", JsonSerializer.Serialize(difference));
        }
        
        public bool SendWebhook(DBDifference difference)
        {
            
            if (!applicationIds.Any(x => difference.entryParentApplicationIds.Contains(x))) return false;
            if (!differenceTypes.Contains(difference.differenceName)) return false;
            return true;
        }

        public void SendDiscordWebhook(DBDifference difference)
        {
            if (!SendWebhook(difference)) return;
            DiscordWebhook webhook = new DiscordWebhook(url);
            DiscordEmbed embed = new DiscordEmbed();
            string websiteUrl = config.publicAddress;
            string icon = websiteUrl + "logo";
            embed.author = new DiscordEmbedAuthor { icon_url = icon, name = "OculusDB", url = websiteUrl };
            Dictionary<string, string> meta = new Dictionary<string, string>();
			foreach (KeyValuePair<string, string> item in meta)
            {
                embed.description += "**" + item.Key + ":** `" + (item.Value.Length <= 0 ? "none" : item.Value) + "`\n";
            }
            embed.description += "**Activity link:** " + websiteUrl + "activity/" + difference.__id;
            webhook.SendEmbed(embed, "OculusDB", icon);
            Thread.Sleep(1200);
        }
    }

    public enum DifferenceWebhookType
    {
        Discord = 0,
        OculusDB = 1
    }
}
