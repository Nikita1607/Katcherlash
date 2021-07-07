using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TMS.NET06.BookingSystem.Models;

namespace TMS.NET06.BookingSystem
{
    public class BookEntry
    {
        public BookEntry()
        {
            NotificationInfo = new NotificationInfo();
        }

        public int BookId { get; set; }

        public string Comment { get; set; }

        //[ForeignKey("ServiceId")]
        public Service Service { get; set; }

        //[Required]
        //public int ServiceId { get; set; }

        public DateTime VisitDate { get; set; }

        public BookingStatus Status { get; set; }

        public Client Client { get; set; }

        public NotificationInfo NotificationInfo { get; set; }
    }
}
