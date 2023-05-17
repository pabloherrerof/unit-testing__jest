 class Room {
    constructor(name, bookings, rate, discount) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }
  
    isOccupied(date) {
      try{
        let isOccupied = false;
  
      this.bookings.forEach((booking) => {
        if (
          this.name !== booking.room.name ||
          this.rate !== booking.room.rate ||
          this.bookings !== booking.room.bookings ||
          this.discount !== booking.room.discount
        ) {
          throw new Error("La reserva introducida en la habitación no corresponde a esta habitación")
        } else if (
          date.getTime() >= booking.checkIn.getTime() &&
          date.getTime() <= booking.checkOut.getTime()
        ) {
          isOccupied = true;
        }
      });
      return isOccupied;
      } catch(e){
          console.log(e.name + ": " + e.message);
          return false;
      }
      
    }
  
    occupancyPercentage(startDate, endDate) {
      try{
        let totalDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      let totalDaysOccupied = 0;
      if (startDate.getTime() >= endDate.getTime()) {
        throw new Error("La fecha de fin introducida es anterior o igual a la fecha de inicio")
      } else {
        if (this.bookings.length === 0) {
          return totalDaysOccupied;
        } else {
          this.bookings.forEach((booking) => {
            if (
              this.name !== booking.room.name ||
              this.rate !== booking.room.rate ||
              this.bookings !== booking.room.bookings ||
              this.discount !== booking.room.discount
            ) {
              throw new Error("La reserva introducida en la habitación no corresponde a esta habitación")
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
          if (isNaN(totalDaysOccupied)) {
            return totalDaysOccupied;
          } else {
            return (totalDaysOccupied / totalDays) * 100;
          }
        }
      }
      } catch (e){
        console.log(e.name + ": " + e.message);
        return -1;
      }
    }
  
    static totalOccupancyPercentage(rooms, startDate, endDate) {
      try{
        let totalPercentage = 0;
      if (startDate.getTime() >= endDate.getTime()) {
        throw new Error("La fecha de fin introducida es anterior o igual a la fecha de inicio")
      } else if (rooms.length === 0) {
         throw new Error("El array de rooms esta vacio");
      } else {
        rooms.forEach((room) => {
          room = new Room(room.name, room.bookings, room.rate, room.discount);
          totalPercentage += room.occupancyPercentage(startDate, endDate);
        });
        if (isNaN(totalPercentage)) {
          throw new Error("La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles")
        } else return totalPercentage / rooms.length;
      }
      } catch (e){
        console.log(e.name + ": " + e.message);
        return -1;
      }
    }
  
    static availableRooms(rooms, startDate, endDate) {
      try{
        let totalRoomsAvailable = [];
      if (startDate.getTime() >= endDate.getTime()) {
        throw new Error("La fecha de fin introducida es anterior o igual a la fecha de inicio")
      } else if (rooms.length === 0) {
        throw new Error("No se han introducido habitaciones");
      } else {
        rooms.forEach((room) => {
          room = new Room(room.name, room.bookings, room.rate, room.discount);
          if (room.occupancyPercentage(startDate, endDate) === 0) {
            totalRoomsAvailable.push(room);
          }
          if(room.occupancyPercentage(startDate, endDate) === -1){
            throw new Error("La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles");
          }
        });
  
        return totalRoomsAvailable;
      }
      } catch(e){
        console.log(e.name + ": " + e.message);
        return [];
      }
      
    }
  }
  
 class Booking {
  
    constructor(name, email, checkIn, checkOut, discount, room) {
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      this.room = room;
    }
  
    getFee(room) {
      try{
        const days = (this.checkOut.getTime() - this.checkIn.getTime())/(1000*60*60*24);
        console.log(days)
        let totalBeforeBookingDiscount = 0;
        let totalPrice = 0;
        if(days >0 ){
          if(!this.room){
            throw new Error("No hay habitación para esta reserva")
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
        } else throw new Error("La fecha de salida es igual o anterior que la de entrada")
        
       
        return totalPrice;
      } catch(e){
        console.log(e.name + ": " + e.message);
        return -1;
      }
     
    }
  }
  const room = new Room("single bed", [], 100, 25);
  const booking = new Booking(
    "marta",
    "marta@yahoo.com",
    new Date("2/1/2023"),
    new Date("2/5/2023"),
    0,
    room)
  
    console.log("hola")
  
  
  
  module.exports = {
    Room,
    Booking,
  };