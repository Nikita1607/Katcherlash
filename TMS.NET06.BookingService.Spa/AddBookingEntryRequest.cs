using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.NET06.BookingService.Spa
{
    public class AddBookingEntryRequest
    {
        public int ServiceId { get; set; }
        public DateTime SelectedDate { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
    }
}
