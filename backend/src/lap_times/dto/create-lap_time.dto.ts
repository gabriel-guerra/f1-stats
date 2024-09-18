export class CreateLapTimeDto {
    raceId: number;
    driverId: number;
    lap: number;
    position: number;
    time: string;
    milliseconds: number;
}
