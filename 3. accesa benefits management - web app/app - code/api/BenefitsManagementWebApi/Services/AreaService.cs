using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using BenefitsManagementWebApi.DTOModels;
using BenefitsManagementWebApi.Interfaces;
using BenefitsManagementWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace BenefitsManagementWebApi.Services
{
    public class AreaService : IAreaService
    {
        private IAreaRepository _areaRepository;
        private IBenefitRepository _benefitRepository;

        public AreaService(IAreaRepository areaRepository, IBenefitRepository benefitRepository)
        {
            _areaRepository = areaRepository;
            _benefitRepository = benefitRepository;
        }

        public void AddArea(AreaDTO area)
        {
            throw new NotImplementedException();
        }

        public void UpdateArea(int id, AreaDTO newArea)
        {
            var area = _areaRepository.Get(id);
            if (area == null)
            {
                throw new NullReferenceException("Area does not exist");
            }
            else
            {
                _areaRepository.Update(id, newArea);
            }
        }

        public Area GetArea(int id)
        {
            var area = _areaRepository.Get(id);
            if (area == null) throw new NullReferenceException("Area does not exist!");

            return area;
        }

        public IList<Area> GetAreas()
        {
            var areas = _areaRepository.GetAll();
            return areas;
        }

        public void RemoveArea(int id)
        {
            var area = _areaRepository.Get(id); ;
            if (area == null) throw new NullReferenceException("Area does not exist!");

            var activeBenefits = _benefitRepository.GetActive(area.Id).Count;

            if (activeBenefits != 0)
            {
                new Exception("Active programs present.");
            }
            _benefitRepository.DeleteAll(area.Id);
            _areaRepository.Delete(id, area);
        }

        public string uploadFile(IFormFile file)
        {
            var primaryKey = "K+tJc7T/YVe6zGPmsoMkvWO5gNz7bqpKIWXL7LJf2sSIDtOE3SnL0tVNJ5YNgli8fhuLnD5HYX/qHW9KT4utiQ==";
            string storageConnectionString = Environment.GetEnvironmentVariable("storageconnectionstring");


            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer container = blobClient.GetContainerReference("public");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(file.FileName);

            using (var fileStream = file.OpenReadStream())
            {
                blockBlob.UploadFromStream(fileStream);
                return "https://sadevinternship.blob.core.windows.net/public/"+file.FileName;
            }

        }
    }
}
