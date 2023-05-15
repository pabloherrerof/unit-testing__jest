 interface roomInterface {
  name: string,
  bookings: Booking[],
  rate: number,
  discount: number
 }
 
 class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
    constructor(name: string,
      bookings: Booking[],
      rate: number,
      discount: number) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }
  
    isOccupied(date: Date) {
      let isOccupied : boolean | string = false;
  
      this.bookings.forEach((booking) => {
        if (
          this.name !== booking.room.name ||
          this.rate !== booking.room.rate ||
          this.bookings !== booking.room.bookings ||
          this.discount !== booking.room.discount
        ) {
          isOccupied =
            "La reserva introducida en la habitación no corresponde a esta habitación";
        } else if (
          date.getTime() >= booking.checkIn.getTime() &&
          date.getTime() <= booking.checkOut.getTime()
        ) {
          isOccupied = true;
        }
      });
      return isOccupied;
    }
  
    occupancyPercentage(startDate : Date, endDate : Date) {
      let totalDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      let totalDaysOccupied : number  = 0;
      let error :string = "";

      if (startDate.getTime() >= endDate.getTime()) {
        return "La fecha de fin introducida es anterior o igual a la fecha de inicio";
      } else {
        if (this.bookings.length === 0) {
          return error = "No hay reservas disponibles";
        } else {
          this.bookings.forEach((booking) => {
            if (
              this.name !== booking.room.name ||
              this.rate !== booking.room.rate ||
              this.bookings !== booking.room.bookings ||
              this.discount !== booking.room.discount
            ) {
              return error = "La reserva introducida en la habitación no corresponde a esta habitación";
            } else if (
              booking.checkIn.getTime() > endDate.getTime() ||
              startDate.getTime() > booking.checkOut.getTime()
            ) {
              return totalDaysOccupied;
            } else if (
              booking.checkIn.getTime() >= startDate.getTime() &&
              booking.checkOut.getTime() <= endDate.getTime()
            ) {
              totalDaysOccupied = totalDays;
            } else {
  
              const startCoincidentDate =
                booking.checkIn.getTime() >= startDate.getTime()
                  ? booking.checkIn.getTime()
                  : startDate.getTime();
              const endCoincidentDate =
                booking.checkOut.getTime() <= endDate.getTime()
                  ? booking.checkOut.getTime()
                  : endDate.getTime();
              let timeOccupied = endCoincidentDate - startCoincidentDate;
              let days = timeOccupied / (1000 * 60 * 60 * 24);
              totalDaysOccupied += days;
            }
          });
          if(error !== "") {
            return error;
          } else return (totalDaysOccupied / totalDays) * 100;
          
        }
      }
    }
  
    static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date) {
      let totalPercentage:any = 0;
      if (startDate.getTime() >= endDate.getTime()) {
        return "La fecha de fin introducida es anterior o igual a la fecha de inicio";
      } else if (rooms.length === 0) {
        return totalPercentage;
      } else {
        rooms.forEach((room) => {
          room = new Room(room.name, room.bookings, room.rate, room.discount);
          console.log(room.occupancyPercentage(startDate, endDate));
          
          totalPercentage += room.occupancyPercentage(startDate, endDate);
        });
        if (isNaN(totalPercentage)) {
          return "La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles";
        } else return totalPercentage / rooms.length;
      }
    }
  
    static availableRooms(rooms : Room[], startDate: Date, endDate: Date) {
      let totalRoomsAvailable: Room[] = [];
      let error: string = "";
      if (startDate.getTime() >= endDate.getTime()) {
        return "La fecha de fin introducida es anterior o igual a la fecha de inicio";
      } else if (rooms.length === 0) {
        return "No se han introducido habitaciones";
      } else {
        rooms.forEach((room: Room) => {
          room = new Room(room.name, room.bookings, room.rate, room.discount);
          if (room.occupancyPercentage(startDate, endDate) === 0) {
            totalRoomsAvailable.push(room);
          }
          if(room.occupancyPercentage(startDate, endDate) === "La reserva introducida en la habitación no corresponde a esta habitación" || room.occupancyPercentage(startDate, endDate) === "No hay reservas disponibles"){
            error = "La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles";
          }
        });

        if(error !== ""){
          return error
        } else return totalRoomsAvailable;
      }
    }
  }
  
 class Booking {
  name: string;
  email: string;
  checkIn:  Date;
  checkOut: Date;
  discount: number;
  room: Room;

  
    constructor(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: Room) {
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      this.room = room;
    }
  
    getFee(room: Room) {
      const days = (this.checkOut.getTime() - this.checkIn.getTime())/(1000*60*60*24);
      let totalBeforeBookingDiscount = 0;
      let totalPrice: number = 0;
      let error = "";
      if(days >0 ){
        if(!this.room){
          error= "No hay habitación para esta reserva"
        } else {
          if(this.room.discount > 0){
            totalBeforeBookingDiscount = (this.room.rate*days)-((this.room.rate*days)*(this.room.discount/100));
            console.log(totalBeforeBookingDiscount)
           if(this.discount > 0){
             totalPrice = totalBeforeBookingDiscount-(totalBeforeBookingDiscount*(this.discount/100));
           } else {
             totalPrice = totalBeforeBookingDiscount;
           }
     
         } else {
           totalBeforeBookingDiscount = this.room.rate * days
           console.log(totalBeforeBookingDiscount)
           
           if(this.discount > 0){
             totalPrice = totalBeforeBookingDiscount-(totalBeforeBookingDiscount*(this.discount/100));
           } else {
             totalPrice = totalBeforeBookingDiscount;
           }
         }
        }
      } else error="La fecha de salida es igual o anterior que la de entrada"
      
     if(error !== ""){
      return error
     } else return totalPrice;
    }
  }
 


  
  
  
  export = {
    Room,
    Booking,
  };