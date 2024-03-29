import { ConfigService, DirectService, EntityService, FilerService, Env, LoggerService, QueryService, SetService } from "../services/Services";
import { ComponentCustomProperties } from "vue";
import * as sweetalert2 from "sweetalert2";
import { Store } from "@/vuex";
import { Store } from "@/store.index";
import State from "@/store/stateType";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $entityService: EntityService;
    $filerService: FilerService;
    $configService: ConfigService;
    $directService: DirectService;
    $env: Env;
    $loggerService: LoggerService;
    $queryService: QueryService;
    $setService: SetService;
    $swal: sweetalert2;
    $store: Store<State>;
  }
}
