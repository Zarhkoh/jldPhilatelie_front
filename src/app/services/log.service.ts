import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/CONFIG';


export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  url = CONFIG.service_url;

  constructor(private datepipe: DatePipe, private http: HttpClient) { }

  debug(msg: any, source: string) {
    this.writeToLog(msg, LogLevel.Debug, source);
  }

  info(msg: string, source: string) {
    this.writeToLog(msg, LogLevel.Info, source);
  }

  warn(msg: string, source: string) {
    this.writeToLog(msg, LogLevel.Warn, source);
  }

  error(msg: string, source: string) {
    this.writeToLog(msg, LogLevel.Error, source);
  }

  fatal(msg: string, source: string) {
    this.writeToLog(msg, LogLevel.Fatal, source);
  }

  private writeToLog(msg: string, level: LogLevel, source: string) {
    let line = "[" + LogLevel[level] + "] " + this.datepipe.transform(new Date, 'dd/MM/yyyy hh:mm:ss') + ', ' + source + ': ' + JSON.stringify(msg);
    console.log(line);
    const params = {
      log: line
    };
    this.http.post(this.url + "/log", { params }).subscribe();
  }
}


