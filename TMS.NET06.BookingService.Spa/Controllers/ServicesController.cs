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

            // Поменять значение на переменные при реализации ввода администратором кол-ва дней для записи и кол-ва рабочих часов.
            List<DateTime> AvailableDates = _bookingRepository.GetDatesList(60, 9);

            return Task.FromResult(AvailableDates.AsEnumerable());
        }

        [HttpPost]
        [Route("[action]")]
        public Task<IEnumerable<DateTime>> AvailableTimesAsync([FromBody] AvaliableTimeRequest avaliableTimeRequest )
        {
            return Task.FromResult(_bookingRepository.GetTimesList(avaliableTimeRequest.date).AsEnumerable());
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<bool> AddBookingEntryAsync([FromBody] AddBookingEntryRequest addBookingEntryRequest)
        {
            var client = new Client()
            {
                Name = addBookingEntryRequest.Username,
                ContactInformation = new ContactInfo()
                {
                    Email = addBookingEntryRequest.Email
                }
            };

            var bookEntry = new BookEntry()
            {
                Service = await _bookingRepository.GetServiceAsync(addBookingEntryRequest.ServiceId),
                VisitDate = addBookingEntryRequest.SelectedDate.ToLocalTime(),
                Comment = addBookingEntryRequest.Description,
                Client = client,
                Status = BookingStatus.Confirmed
            };

            return await _bookingRepository.AddBookingEntry(bookEntry);
        }
    }
}