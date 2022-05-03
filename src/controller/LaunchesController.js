import axios from 'axios';
import {
  LaunchBuilder,
  LaunchBuilderFromArray,
} from '../services/LaunchBuilder';
import { baseUrl } from '../utils';

export default class LaunchesController {
  static async latest(req, res, _next) {
    const { data } = await axios.get(`${baseUrl}/launches/latest`);
    const { launch } = await LaunchBuilder(data, false);
    return _next(res.json({ ...launch }));
  }

  static async next(req, res, _next) {
    const { data } = await axios.get(`${baseUrl}/launches/next`);
    const { launch } = await LaunchBuilder(data, true);
    return _next(res.json({ ...launch }));
  }

  static async past(req, res, _next) {
    const { data } = await axios.get(`${baseUrl}/launches/past`);
    const launches = await LaunchBuilderFromArray(data);
    return _next(res.json(launches));
  }

  static async upcoming(req, res, _next) {
    const { data } = await axios.get(`${baseUrl}/launches/upcoming`);
    const launches = await LaunchBuilderFromArray(data, true);
    return _next(res.json(launches));
  }
}
