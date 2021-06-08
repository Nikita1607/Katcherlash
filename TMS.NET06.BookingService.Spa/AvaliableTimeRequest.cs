using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMS.NET06.BookingService.Spa
{
    public class AvaliableTimeRequest
    {
        public int serviceId { get; set; }
        public DateTime date { get; set; }
    }
}
