import { registerEloProtocol } from "@/browser/utility/protocols/_protocols/flow";
import { registerEloExternalProtocol } from "@/browser/utility/protocols/_protocols/flow-external";
import { PATHS } from "@/modules/paths";
import { Session, protocol } from "electron";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "flow-internal",
    privileges: { standard: true, secure: true, bypassCSP: true, codeCache: true, supportFetchAPI: true }
  },
  {
    scheme: "flow",
    privileges: { standard: true, secure: true, bypassCSP: true, codeCache: true, supportFetchAPI: true }
  },
  {
    scheme: "flow-external",
    privileges: { standard: true, secure: true }
  }
]);

export function registerProtocolsWithSession(session: Session) {
  const protocol = session.protocol;
  registerEloProtocol(protocol);
  registerEloExternalProtocol(protocol);
}

export function registerPreloadScript(session: Session) {
  session.registerPreloadScript({
    id: "flow-preload",
    type: "frame",
    filePath: PATHS.PRELOAD
  });
}
