using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Language.V1;
using Google.Protobuf.Collections;
using Org.BouncyCastle.Math.EC.Rfc7748;
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;

namespace WebFMI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SentimentalAnalysisController : ControllerBase
    {
        public static string Usage;
        // [START language_entities_gcs]
        private static void AnalyzeEntitiesFromFile(string gcsUri)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeEntities(new Document()
            {
                GcsContentUri = gcsUri,
                Type = Document.Types.Type.PlainText
            });
            WriteEntities(response.Entities);
        }
        // [END language_entities_gcs]

        // [START language_entities_text]
        private static void AnalyzeEntitiesFromText(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeEntities(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            });
            WriteEntities(response.Entities);
        }

        // [START language_entities_gcs]
        private static void WriteEntities(IEnumerable<Entity> entities)
        {
            Console.WriteLine("Entities:");
            foreach (var entity in entities)
            {
                Console.WriteLine($"\tName: {entity.Name}");
                Console.WriteLine($"\tType: {entity.Type}");
                Console.WriteLine($"\tSalience: {entity.Salience}");
                Console.WriteLine("\tMentions:");
                foreach (var mention in entity.Mentions)
                    Console.WriteLine($"\t\t{mention.Text.BeginOffset}: {mention.Text.Content}");
                Console.WriteLine("\tMetadata:");
                foreach (var keyval in entity.Metadata)
                {
                    Console.WriteLine($"\t\t{keyval.Key}: {keyval.Value}");
                }
            }
        }
        // [END language_entities_gcs]
        // [END language_entities_text]

        // [START language_sentiment_gcs]
        private static void AnalyzeSentimentFromFile(string gcsUri)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeSentiment(new Document()
            {
                GcsContentUri = gcsUri,
                Type = Document.Types.Type.PlainText
            });
            WriteSentiment(response.DocumentSentiment, response.Sentences);
        }
        // [END language_sentiment_gcs]

        // [START language_sentiment_text]
        private static void AnalyzeSentimentFromText(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeSentiment(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            });
            WriteSentiment(response.DocumentSentiment, response.Sentences);
        }

        // [START language_sentiment_gcs]
        private static void WriteSentiment(Sentiment sentiment,
            RepeatedField<Sentence> sentences)
        {
            Console.WriteLine("Overall document sentiment:");
            Console.WriteLine($"\tScore: {sentiment.Score}");
            Console.WriteLine($"\tMagnitude: {sentiment.Magnitude}");
            Console.WriteLine("Sentence level sentiment:");
            foreach (var sentence in sentences)
            {
                Console.WriteLine($"\t{sentence.Text.Content}: "
                    + $"({sentence.Sentiment.Score})");
            }
        }
        // [END language_sentiment_gcs]
        // [END language_sentiment_text]

        // [START language_syntax_gcs]
        private static void AnalyzeSyntaxFromFile(string gcsUri)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnnotateText(new Document()
            {
                GcsContentUri = gcsUri,
                Type = Document.Types.Type.PlainText
            },
            new AnnotateTextRequest.Types.Features() { ExtractSyntax = true });
            WriteSentences(response.Sentences, response.Tokens);
        }
        // [END language_syntax_gcs]

        // [START language_syntax_text]
        private static void AnalyzeSyntaxFromText(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnnotateText(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            },
            new AnnotateTextRequest.Types.Features() { ExtractSyntax = true });
            WriteSentences(response.Sentences, response.Tokens);
        }

        // [START language_syntax_gcs]
        private static void WriteSentences(IEnumerable<Sentence> sentences,
            RepeatedField<Token> tokens)
        {
            Console.WriteLine("Sentences:");
            foreach (var sentence in sentences)
            {
                Console.WriteLine($"\t{sentence.Text.BeginOffset}: {sentence.Text.Content}");
            }
            Console.WriteLine("Tokens:");
            foreach (var token in tokens)
            {
                Console.WriteLine($"\t{token.PartOfSpeech.Tag} "
                    + $"{token.Text.Content}");
            }
        }
        // [END language_syntax_gcs]
        // [END language_syntax_text]

        // [START language_entity_sentiment_gcs]
        private static void AnalyzeEntitySentimentFromFile(string gcsUri)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeEntitySentiment(new Document()
            {
                GcsContentUri = gcsUri,
                Type = Document.Types.Type.PlainText
            });
            WriteEntitySentiment(response.Entities);
        }
        // [END language_entity_sentiment_gcs]

        // [START language_entity_sentiment_text]
        private static void AnalyzeEntitySentimentFromText(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeEntitySentiment(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            });
            WriteEntitySentiment(response.Entities);
        }

        // [START language_entity_sentiment_gcs]
        private static void WriteEntitySentiment(IEnumerable<Entity> entities)
        {
            Console.WriteLine("Entity Sentiment:");
            foreach (var entity in entities)
            {
                Console.WriteLine($"\t{entity.Name} "
                    + $"({(int)(entity.Salience * 100)}%)");
                Console.WriteLine($"\t\tScore: {entity.Sentiment.Score}");
                Console.WriteLine($"\t\tMagnitude { entity.Sentiment.Magnitude}");
            }
        }
        // [END language_entity_sentiment_gcs]
        // [END language_entity_sentiment_text]

        // [START language_classify_gcs]
        private static void ClassifyTextFromFile(string gcsUri)
        {
            var client = LanguageServiceClient.Create();
            var response = client.ClassifyText(new Document()
            {
                GcsContentUri = gcsUri,
                Type = Document.Types.Type.PlainText
            });
            WriteCategories(response.Categories);
        }
        // [END language_classify_gcs]

        // [START language_classify_text]
        private static void ClassifyTextFromText(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.ClassifyText(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            });
            WriteCategories(response.Categories);
        }

        // [START language_classify_gcs]
        private static void WriteCategories(IEnumerable<ClassificationCategory> categories)
        {
            Console.WriteLine("Categories:");
            foreach (var category in categories)
            {
                Console.WriteLine($"\tCategory: {category.Name}");
                Console.WriteLine($"\t\tConfidence: {category.Confidence}");
            }
        }
        // [END language_classify_text]
        // [END language_classify_gcs]

        private static void AnalyzeEverything(string text)
        {
            var client = LanguageServiceClient.Create();
            var response = client.AnnotateText(new Document()
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            },
            new AnnotateTextRequest.Types.Features()
            {
                ExtractSyntax = true,
                ExtractDocumentSentiment = true,
                ExtractEntities = true,
                ExtractEntitySentiment = true,
                ClassifyText = true,
            });
            Console.WriteLine($"Language: {response.Language}");
            WriteSentiment(response.DocumentSentiment, response.Sentences);
            WriteSentences(response.Sentences, response.Tokens);
            WriteEntities(response.Entities);
            WriteEntitySentiment(response.Entities);
            WriteCategories(response.Categories);
        }
        // Some APIs, like Storage, accept a credential in their Create()
        // method.
        public object AuthExplicit(string projectId, string jsonPath)
        {
            // Explicitly use service account credentials by specifying 
            // the private key file.
            var credential = GoogleCredential.FromFile(jsonPath);
            var storage = StorageClient.Create(credential);
            // Make an authenticated API request.
            var buckets = storage.ListBuckets(projectId);
            foreach (var bucket in buckets)
            {
                Console.WriteLine(bucket.Name);
            }
            return null;
        }

        [HttpGet("analysis/{cuvant}")]
        public async Task<IActionResult> Analysis(string cuvant)
        {
            AuthExplicit("teak-passage-278407", "T:/Ioana/Downloads/My Project 79292-181c565ffbe1.json");

            string credential_path = "T:/Ioana/Downloads/My Project 79292-181c565ffbe1.json";
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credential_path);
            //AnalyzeEntitySentimentFromText("beautiful");
            string value = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

            var text = "Yukihiro Matsumoto is great!";
            var client = LanguageServiceClient.Create();
            var response = client.AnalyzeSentiment(Document.FromPlainText(text));
            var sentiment = response.DocumentSentiment;
            Console.WriteLine($"Score: {sentiment.Score}");
            Console.WriteLine($"Magnitude: {sentiment.Magnitude}");

            return Ok(value);


        }



    }
}
