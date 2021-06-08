using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS.NET06.BookingSystem;

namespace TMS.NET06.BookingService.Spa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly ILogger<ServicesController> _logger;
        private readonly IBookingRepository _bookingRepository;

        public ServicesController(
            ILogger<ServicesController> logger,
            IBookingRepository bookingRepository)
        {
            _logger = logger;
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Service>> GetAsync()
        {
            return await _bookingRepository.GetServicesAsync();
        }

        [HttpPost]
        [Route("[action]")]
        public Task<IEnumerable<DateTime>> AvailableDatesAsync(int serviceId)
        {
            System.Threading.Thread.Sleep(1000);
            //return Task.FromResult(new[] { DateTime.Now.Date, DateTime.Now.AddMonths(1) }.AsEnumerable());
            return Task.FromResult(GetDatesList(30).AsEnumerable());
        }

        private List<DateTime> GetDatesList(int CountDays)
        {
            var DatesList = new List<DateTime>();

            var currentDate = DateTime.Now;
            var endDate = DateTime.Now.AddMonths(2);

            while (currentDate <= endDate)
            {
                DatesList.Add(currentDate);
                currentDate = currentDate.AddDays(1);
            }

            return DatesList;
        }

        [HttpPost]
        [Route("[action]")]
        public Task<IEnumerable<string>> AvailableTimesAsync([FromBody] AvaliableTimeRequest avaliableTimeRequest )

        {
            return Task.FromResult(GetTimesList(avaliableTimeRequest.serviceId, avaliableTimeRequest.date).AsEnumerable());
        }

        private List<String> GetTimesList(int serviceId , DateTime date)
        {
            return new List<string>()
            {
                "09:00",
                "09:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",


            };
        }
    }
}