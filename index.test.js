const { Room, Booking } = require("./index");

describe("Comprobar que una habitación esta ocupada", () => {
  test("Devolverá true si la habitación está ocupada en la fecha indicada", () => {
    const room = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("2/1/2023"),
      new Date("2/5/2023"),
      20,
      room
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@gm.com",
      new Date("6/2/2023"),
      new Date("6/9/2023"),
      25,
      room
    );
    room.bookings = [booking1, booking2];
    expect(room.isOccupied(new Date("2/4/2023"))).toBe(true);
  });

  test("Devolvera false si la habitación no está ocupada en la fecha indicada", () => {
    const room = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/1/2023"),
      new Date("6/10/2023"),
      20,
      room
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@gm.com",
      new Date("6/11/2023"),
      new Date("6/20/2023"),
      25,
      room
    );
    room.bookings = [booking1, booking2];
    

    expect(room.isOccupied(new Date("24/2/1990"))).toBe(false);
  });

  test("Devolvera false si la habitación no esta reservada", () => {
    const room = new Room("single bed", [], 120, 20);
    expect(room.isOccupied(new Date("24/2/2023"))).toBe(false);
  });

  test("Devolverá que la reserva del room no es correspondiente a ese room", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("double bed", [], 125, 20);
    const booking2 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room1
    );
    const booking3 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room2
    );
    room1.bookings = [booking2, booking3];
    expect(room1.isOccupied(new Date("6/2/2023"))).toBe(
      "La reserva introducida en la habitación no corresponde a esta habitación"
    );
  });
});

describe("Comprobar el porcentaje de dias ocupados entre dos fechas dadas", () => {
  test("Devolverá que la fecha final es anterior a la fecha inicial", () => {
    const room = new Room("single bed", [], 120, 20);
    expect(
      room.occupancyPercentage(new Date("1/1/2023"), new Date("1/1/1990"))
    ).toBe(
      "La fecha de fin introducida es anterior o igual a la fecha de inicio"
    );
  });

  test("Devolverá que la fecha final es igual a la fecha inicial", () => {
    const room = new Room("single bed", [], 120, 20);
    expect(
      room.occupancyPercentage(new Date("1/1/2023"), new Date("1/1/2023"))
    ).toBe(
      "La fecha de fin introducida es anterior o igual a la fecha de inicio"
    );
  });

  test("Devolverá el porcentaje correspondiente de los días ocupados entre dos fechas", () => {
    const room = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room
    );
    room.bookings = [booking1];
    expect(
      room.occupancyPercentage(new Date("6/5/2023"), new Date("6/15/2023"))
    ).toBe(50);
  });

  test("Devolvera 0% si la habitación no esta reservada", () => {
    const room = new Room("single bed", [], 120, 20);
    expect(
      room.occupancyPercentage(new Date("1/1/2023"), new Date("1/2/2023"))
    ).toBe("No hay reservas disponibles");
  });
  test("Devolverá 0% si la habitación no esta ocupada para esos dias", () => {
    const room = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room
    );
    room.bookings = [booking1];
    expect(
      room.occupancyPercentage(new Date("1/1/2000"), new Date("1/2/2000"))
    ).toBe(0);
  });
  test("Devolverá 100% por que esta reservada los dias introducidos o más", () => {
    const room = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@gm.com",
      new Date("6/20/2023"),
      new Date("7/1/2023"),
      25,
      room
    );
    room.bookings = [booking1, booking2];
    expect(
      room.occupancyPercentage(new Date("6/15/2023"), new Date("6/20/2023"))
    ).toBe(100);
  });
  test("Devolverá que la reserva del room no es correspondiente a ese room", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("double bed", [], 125, 20);
    const booking2 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room1
    );
    const booking3 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room2
    );
    room1.bookings = [booking2, booking3];
    expect(room1.isOccupied(new Date("6/2/2023"))).toBe(
      "La reserva introducida en la habitación no corresponde a esta habitación"
    );
  });
});

describe("Comprobar el porcentaje total de ocupación", () => {
  test("Devolverá que la fecha final es anterior a la fecha inicial", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const rooms = [room1, room2];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/1/2023"),
        new Date("6/21/1990")
      )
    ).toBe(
      "La fecha de fin introducida es anterior o igual a la fecha de inicio"
    );
  });
  test("Devolverá que el array de rooms esta vacio", () => {
    const rooms = [];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/1/2023"),
        new Date("6/21/2023")
      )
    ).toBe(0);
  });
  test("Devolverá la ocupación total de las habitaciones para las fechas introducidas", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/1/2023"),
      new Date("6/10/2023"),
      20,
      room1
    );
    const booking2 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];
    const rooms = [room1, room2];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/5/2023"),
        new Date("6/15/2023")
      )
    ).toBe(50);
  });
  test("Devolverá un 0% de ocupación total dado que todas las rooms estan disponibles para esos días", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/15/2023"),
      20,
      room1
    );
    const booking2 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/11/2023"),
      new Date("6/16/2023"),
      20,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];
    const rooms = [room1, room2];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/1/2020"),
        new Date("6/21/2020")
      )
    ).toBe(0);
  });
  test("Devolverá que las habitaciones no estan reservadas", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const rooms = [room1, room2];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/1/2020"),
        new Date("6/21/2020")
      )
    ).toBe("La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles");
  });
  test("Devolverá un 100% de ocupación total por que las habitaciones estan reservadas", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/15/2023"),
      20,
      room1
    );
    const booking2 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/11/2023"),
      new Date("6/16/2023"),
      20,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];
    const rooms = [room1, room2];
    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("6/1/2023"),
        new Date("7/15/2023")
      )
    ).toBe(100);
  });

  test("Devolverá que la reserva del room no es correspondiente a ese room", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("double bed", [], 125, 20);
    const booking2 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room1
    );
    const booking3 = new Booking(
      "Juan",
      "xxx@mail.com",
      new Date("May 07, 2023"),
      new Date("May 21, 2023"),
      0,
      room2
    );
    room1.bookings = [booking2, booking3];
    const rooms = [room1]
    expect(Room.totalOccupancyPercentage(rooms,
        new Date("6/1/2020"),
        new Date("6/21/2020") )).toBe(
      "La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles"
    );
  });
});

describe("Comprobar las habitaciones disponibles entre dos fechas", () => {
  test("Devolverá que la fecha final es anterior a la fecha inicial", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const rooms = [room1, room2];
    expect(
      Room.availableRooms(rooms, new Date("6/1/2023"), new Date("6/21/1990"))
    ).toBe(
      "La fecha de fin introducida es anterior o igual a la fecha de inicio"
    );
  });
  test("Devolverá que la fecha final es igual a la fecha inicial", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const rooms = [room1, room2];
    expect(
      Room.availableRooms(rooms, new Date("6/1/2023"), new Date("6/1/2023"))
    ).toBe(
      "La fecha de fin introducida es anterior o igual a la fecha de inicio"
    );
  });

  test("Devolverá que el array de rooms esta vacio por que no hay habitaciones", () => {
    const rooms = [];
    expect(
      Room.availableRooms(rooms, new Date("6/1/2023"), new Date("6/10/2023"))
    ).toBe("No se han introducido habitaciones");
  });
  test("Devolverá un array vacio por que todas las habitaciones estan ocupadas para esas fechas", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("double bed", [], 125, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@gm.com",
      new Date("6/20/2023"),
      new Date("7/1/2023"),
      25,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2]

    const rooms = [room1, room2];
    expect(
      Room.availableRooms(rooms, new Date("6/1/2023"), new Date("7/10/2023"))
    ).toEqual([]);
  });
  test("Devolverá las habitaciones disponbles para los días introducidos", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("double bed", [], 125, 20);
    const booking1 = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date("6/10/2023"),
      new Date("6/20/2023"),
      20,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@gm.com",
      new Date("6/20/2023"),
      new Date("7/1/2023"),
      25,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];

    const rooms = [room1, room2];
    expect(
      Room.availableRooms(rooms, new Date("6/10/2023"), new Date("6/15/2023"))
    ).toStrictEqual([room2]);
  });
  test("Devolverá que las habitaciones no estan reservadas", () => {
    const room1 = new Room("single bed", [], 120, 20);
    const room2 = new Room("single bed", [], 120, 20);
    const rooms = [room1, room2];
    expect(
      Room.availableRooms(
        rooms,
        new Date("6/1/2020"),
        new Date("6/21/2020")
      )
    ).toBe("La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles");
  });

  test("Devolverá que la reserva del room no es correspondiente a ese room", () => {
    const room1 = new Room("single bed", [], 120, 20);
const room2 = new Room("double bed", [], 125, 20);
const booking1 = new Booking(
  "marta",
  "marta@yahoo.com",
  new Date("6/10/2023"),
  new Date("6/20/2023"),
  20,
  room1
);
const booking2 = new Booking(
  "luisa",
  "luisa@gm.com",
  new Date("6/20/2023"),
  new Date("7/1/2023"),
  25,
  room2
);
room1.bookings = [booking2];
room2.bookings = [booking2]


const rooms = [room2, room1];
    expect(Room.availableRooms(
        rooms,
        new Date("6/1/2020"),
        new Date("6/21/2020")
      )).toBe(
      "La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles"
    );
  });
});


describe("Comprobar el fee total de un booking", () => {
    test("Devolverá que el fee es el valor por noche cuando ambos descuentos sean 0", () => {
        const room = new Room("single bed", [], 100, 0);
        const booking = new Booking(
          "marta",
          "marta@yahoo.com",
          new Date("2/1/2023"),
          new Date("2/5/2023"),
          0,
          room
        );
        room.bookings = booking;

        expect(booking.getFee()).toBe(400);
    })

    test("Devolverá que no hay room introducida", () =>{
        const booking = new Booking(
            "marta",
            "marta@yahoo.com",
            new Date("2/1/2023"),
            new Date("2/5/2023"),
            0
          );
        expect(booking.getFee()).toBe("No hay habitación para esta reserva");
    })


    test("Devolverá que el fee es el valor total de las noches con descuento aun que el descuento del booking sea igual a 0", () =>{
        const room = new Room("single bed", [], 100, 25);
        const booking = new Booking(
          "marta",
          "marta@yahoo.com",
          new Date("2/1/2023"),
          new Date("2/5/2023"),
          0,
          room
        );
        room.bookings = booking;
        expect(booking.getFee()).toBe(300);
    })

    test("Devolverá el valor total por noche con descuento y con descuento de booking aplicado", () => {
        const room = new Room ("single bed", [], 100, 25);
        const booking = new Booking(
          "marta",
          "marta@yahoo.com",
          new Date("2/1/2023"),
          new Date("2/5/2023"),
          10,
          room
        );
        room.bookings = booking;

        expect(booking.getFee()).toBe(270);
    })

    test("Devolverá el valor 0 por que el precio de la habitación es 0", () => {
        const room = new Room ("single bed", [], 0, 25);
        const booking = new Booking(
          "marta",
          "marta@yahoo.com",
          new Date("2/1/2023"),
          new Date("2/5/2023"),
          10,
          room
        );
        room.bookings = booking;

        expect(booking.getFee()).toBe(0);
    })

    test("Devolverá que la fecha de salida es la misma o anterior que la de entrada", () => {
        const room = new Room ("single bed", [], 0, 25);
        const booking = new Booking(
          "marta",
          "marta@yahoo.com",
          new Date("2/5/2023"),
          new Date("2/1/2023"),
          10,
          room
        );
        room.bookings = booking;

        expect(booking.getFee()).toBe("La fecha de salida es igual o anterior que la de entrada");
    })

 }) 
