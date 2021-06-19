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
            List<DateTime> AvailableDates = _bookingRepository.GetDatesList(60);

            return Task.FromResult(AvailableDates.AsEnumerable());
        }

        [HttpPost]
        [Route("[action]")]
        public Task<IEnumerable<DateTime>> AvailableTimesAsync([FromBody] AvaliableTimeRequest avaliableTimeRequest )
        {
            //return Task.FromResult(GetTimesList(avaliableTimeRequest.serviceId, avaliableTimeRequest.date).AsEnumerable());
            return Task.FromResult(_bookingRepository.GetTimesList(avaliableTimeRequest.date).AsEnumerable());
        }

        //private List<String> GetTimesList_old(int serviceId , DateTime date)
        //{
        //    return new List<string>()
        //    {
        //        "01:00",
        //        "02:00",
        //        "03:00",
        //        "04:00",
        //        "05:00",
        //        "06:00",
        //        "09:30",
        //        "10:00",
        //        "10:30",
        //        "11:00",
        //        "11:30",
        //        "19:30",
        //        "20:30",
        //        "21:30",
        //        "22:30",
        //    };
        //}

        [HttpPost]
        [Route("[action]")]
        public Task<bool> AddBookingEntryAsync([FromBody] AddBookingEntryRequest addBookingEntryRequest)
        {
            using (var bookingContext = new BookingContext())
            {
                //Поиск существующего по контактной информации
                var client = new Client()
                {
                    Name = addBookingEntryRequest.Username,
                    ContactInformation = new ContactInfo()
                    {
                        Email = addBookingEntryRequest.Email
                    }
                };

                bookingContext.Clients.Add(client);

                var bookEntry = new BookEntry()
                {
                    Service = bookingContext.Services.Single(s => s.ServiceId == addBookingEntryRequest.ServiceId),
                    VisitDate = addBookingEntryRequest.SelectedDate.ToLocalTime(),
                    Comment = addBookingEntryRequest.Description,
                    Client = client,
                    Status = BookingStatus.Confirmed
                };

                bookingContext.BookingEntries.Add(bookEntry);

                bookingContext.SaveChanges();
            }

            return Task.FromResult(true);
        }
    }
}